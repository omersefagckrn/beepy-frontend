const calculateSidePaneWidth = (screenWidth: number) => {
	if (screenWidth > 1200) return 25;
	if (screenWidth > 800) return 40;
	if (screenWidth < 800) return 100;
	return 0;
};

export { calculateSidePaneWidth };
