import {
  BabelPluginDynamicImportNode,
  BabelPluginParameterDecorator,
  BabelPluginProposalDecorators,
  BabelPluginSyntaxImportAssertions,
  BabelPluginTransformImportMeta,
  BabelPluginTransformNullishCoalescingOperator,
  BabelPluginTransformOptionalChaining,
  BabelPluginTransformTypescript,
  BabelPluginTransformTypescriptMeta,
  BabelTransformExportNamespaceFrom,
  BabelTransformModulesCommonJS,
  BabelPluginImportMetaEnv,
  BabelSyntaxClassProperties,
  transformSync
  // @ts-ignore
} from "../vendor/babel/dist/babel.cjs";

import type {
  TransformOptions as BabelTransformOptions,
  PluginItem,
} from "@babel/core";

import { TransformOptions, TRANSFORM_RESULT } from "./types";

export default function transform(opts: TransformOptions): TRANSFORM_RESULT {
  const _opts: BabelTransformOptions & { plugins: PluginItem[] } = {
    babelrc: false,
    configFile: false,
    compact: false,
    retainLines:
      typeof opts.retainLines === "boolean" ? opts.retainLines : true,
    filename: "",
    cwd: "/",
    ...opts.babel,
    plugins: [
      [
        BabelTransformModulesCommonJS,
        { allowTopLevelThis: true },
      ],
      [BabelPluginDynamicImportNode, { noInterop: true }],
      [BabelPluginTransformImportMeta, { filename: opts.filename }],
      [BabelSyntaxClassProperties],
      [BabelTransformExportNamespaceFrom],
      [BabelPluginImportMetaEnv],
    ],
  };

  if (opts.ts) {
    _opts.plugins.push([
      BabelPluginTransformTypescript,
      { allowDeclareFields: true },
    ]);
    // `unshift` because these plugin must come before `@babel/plugin-syntax-class-properties`
    _opts.plugins.unshift(
      [BabelPluginTransformTypescriptMeta],
      [BabelPluginProposalDecorators, { legacy: true }],
    );
    _opts.plugins.push(BabelPluginParameterDecorator);
    _opts.plugins.push(BabelPluginSyntaxImportAssertions);
  }

  if (opts.legacy) {
    _opts.plugins.push(
      BabelPluginTransformNullishCoalescingOperator,
    );
    _opts.plugins.push(BabelPluginTransformOptionalChaining);
  }

  if (opts.babel && Array.isArray(opts.babel.plugins)) {
    _opts.plugins?.push(...opts.babel.plugins);
  }

  try {
    return {
      code: transformSync(opts.source, _opts)?.code || "",
    };
  } catch (error: any) {
    return {
      error,
      code:
        "exports.__JITI_ERROR__ = " +
        JSON.stringify({
          filename: opts.filename,
          line: error.loc?.line || 0,
          column: error.loc?.column || 0,
          code: error.code
            ?.replace("BABEL_", "")
            .replace("PARSE_ERROR", "ParseError"),
          message: error.message?.replace("/: ", "").replace(/\(.+\)\s*$/, ""),
        }),
    };
  }
}
