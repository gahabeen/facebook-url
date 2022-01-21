function memoize(func) {
    const memo = {};
    const that = this;
    return function (...args) {
        if (args in memo) return memo[args];
        memo[args] = func.apply(that, args);
        return memo[args];
    };
};

module.exports = memoize;
