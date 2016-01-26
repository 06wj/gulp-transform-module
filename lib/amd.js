module.exports = function(metadata){
    var head = "define(%module%%modules%function(%classes%){\n\n";
    var tail = "\n\n});";

    var moduleStr = metadata.module ? ("'" + metadata.module + "', ") : "";
    head = head.replace(/%module%/, moduleStr);
    var requireModulesStr = metadata.requireModules.length ? ("['" + metadata.requireModules.join("', '") + "'], ") : "";
    head = head.replace(/%modules%/, requireModulesStr);
    var requireClassesStr = metadata.requireClasses.join(', ');
    head = head.replace(/%classes%/, requireClassesStr);

    if(metadata.moduleName) tail = '\n\nreturn ' + metadata.moduleName + ';' + tail;

    return {head:head, tail:tail};
};