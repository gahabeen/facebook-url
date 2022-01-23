const isId = (str) => /^\d+$/.test(str || '');
const isIdentifier = (str) => str && (isId(str) || str.length > 1);
const identify = (identifier = '') => {
    let id;
    let slug;

    if (isIdentifier(identifier)) {
        const parts = (identifier || '').trim().split('-');
        const potentialId = ([...parts].reverse()[0] || '').trim();
        if (isId(potentialId)) {
            id = potentialId;
            slug = parts.slice(0, -1).join('-') || undefined;
        } else {
            slug = identifier || undefined;
        }
    }

    return {
        identifier: identifier || '',
        id,
        slug,
        // ...(id ? { id } : {}),
        // ...(slug ? { slug } : {}),
    };
};

module.exports = {
    isId,
    isIdentifier,
    identify,
};
