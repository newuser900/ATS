const getAttentivenessPercent = (data) => {
	let totalInstances = 0,
		attentiveInstances = 0;
	data.forEach((log) => {
		if (log.data.isAttentive) attentiveInstances++;
		totalInstances++;
	});

	return (attentiveInstances / totalInstances) * 100;
};

export { getAttentivenessPercent };
