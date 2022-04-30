const getDays = (date: number) => {
    return Math.round((Date.now() - date)/86400000);
};

export default getDays;