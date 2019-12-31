import JSYaml from 'js-yaml';

export const toYaml = j => JSYaml.safeDump(j);
export const toJson = j => JSYaml.safeLoad(j);
