export { transformSync } from "@babel/core";

export { TransformImportMetaPlugin as BabelPluginTransformImportMeta } from "./plugins/babel-plugin-transform-import-meta";

export { importMetaEnvPlugin as BabelPluginImportMetaEnv } from "./plugins/import-meta-env";

// @ts-ignore
export { default as BabelTransformModulesCommonJS } from "@babel/plugin-transform-modules-commonjs";

// @ts-ignore
export { default as BabelSyntaxClassProperties } from "@babel/plugin-syntax-class-properties";

// @ts-ignore
export { default as BabelPluginDynamicImportNode } from "babel-plugin-dynamic-import-node";

// @ts-ignore
export { default as BabelTransformExportNamespaceFrom } from "@babel/plugin-transform-export-namespace-from";

// @ts-ignore
export { default as BabelPluginTransformTypescript } from "@babel/plugin-transform-typescript";

// @ts-ignore
export { default as BabelPluginTransformTypescriptMeta } from "babel-plugin-transform-typescript-metadata";

// @ts-ignore
export { default as BabelPluginProposalDecorators } from "@babel/plugin-proposal-decorators";

// @ts-ignore
export { default as BabelPluginParameterDecorator } from "babel-plugin-parameter-decorator";

// @ts-ignore
export { default as BabelPluginSyntaxImportAssertions } from "@babel/plugin-syntax-import-assertions";

// @ts-ignore
export { default as BabelPluginTransformNullishCoalescingOperator } from "@babel/plugin-transform-nullish-coalescing-operator";

// @ts-ignore
export { default as BabelPluginTransformOptionalChaining } from "@babel/plugin-transform-optional-chaining";
