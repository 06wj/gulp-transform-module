module.exports = function(metadata){
    var head = "KISSY.add(%module%function(%classes%){\n\n";
    var tail = "\n\n}, {\n    requires: %modules%\n});";

    var moduleStr = metadata.module ? ("'" + metadata.module + "', ") : "";
    head = head.replace(/%module%/, moduleStr);
    var requireClassesStr = (['S'].concat(metadata.requireClasses)).join(', ');
    head = head.replace(/%classes%/, requireClassesStr);

    var requireModulesStr = metadata.requireModules.length ? ("['" + metadata.requireModules.join("', '") + "']") : "";
    if(requireModulesStr) tail = tail.replace(/%modules%/, requireModulesStr);
    else tail = '\n\n});';
    if(metadata.moduleName) tail = '\n\nreturn ' + metadata.moduleName + ';' + tail;

    return {head:head, tail:tail};
};