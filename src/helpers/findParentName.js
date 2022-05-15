const findParentName = (name) => {
    let names = {};
    if (name.indexOf('-') == name.lastIndexOf('-')) {
        names.root = name.substring(0, name.indexOf('-'));
        name = name.substring(name.indexOf('-') + 1);
        names.parent = name;
    } else {
        names.root = name.substring(0, name.indexOf('-'));
        name = name.substring(name.indexOf('-') + 1);
        names.parent = name.substring(0, name.indexOf('-'));

        if (name.includes('-')) {
            names.sub = name.substring(name.indexOf('-') + 1);
            names.sub.includes('-')
                ? (names.subName = names.sub.split('-').join(' '))
                : (names.subName = names.sub);
        }
    }
    return names;
};

module.exports = { findParentName };
