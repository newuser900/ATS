const generatePieChartData = (logs) => {
	const data = {
		labels: ["In Calibration", "Attentive", "Inattentive"],
		datasets: [
			{
				label: "label",
				data: [],
				backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
				borderWidth: 1,
			},
		],
	};
	let calib = 0,
		att = 0,
		inatt = 0,
		total = 0;
	logs.forEach((log) => {
		if (log.data.isCalibrating) calib++;
		else if (log.data.isAttentive === true) att++;
		else inatt++;
		total++;
	});
	data.datasets[0].data = [
		Number((calib / total) * 100).toFixed(2),
		Number((att / total) * 100).toFixed(2),
		Number((inatt / total) * 100).toFixed(2),
	];
	console.log(data);
	return data;
};

const generateLineChartData = (logs, startTime) => {
	const data = {
		labels: [],
		datasets: [
			{
				label: "Attentiveness",
				data: [],
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgba(255, 99, 132, 0.4)",
				pointBackgroundColor: [],
			},
		],
	};
	logs.forEach((log) => {
		const timeElapsed = new Date(log.timestamp); //new Date(new Date(log.timestamp).getTime() - new Date(startTime).getTime()).getTime() / 1000;
		const ptColors = ["rgba(255, 206, 86, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"];
		const y_point = log.data.isCalibrating ? 0 : log.data.isAttentive ? 1 : -1;
		data.labels.push(timeElapsed);
		data.datasets[0].data.push(y_point);
		data.datasets[0].pointBackgroundColor.push(ptColors[y_point + 1]);
		// y_point === 1 ? 0 : y_point === 0 ? 1 : 2
	});
	console.log(data);
	return data;
};

const lineOptions = {
	responsive: true,
	title: { display: true, text: "Attention Tracking Logs" },
	elements: {
		line: {
			borderJoinStyle: "round",
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				display: true,
				scaleLabel: {
					display: true,
					labelString: "Time",
					fontFamily: "Times New Roman",
					fontStyle: "bold",
					fontSize: 20,
				},
				ticks: {
					autoSkip: true,
					maxTicksLimit: 20,
				},
			},
		],
		yAxes: [
			{
				display: true,
				scaleLabel: {
					display: true,
					labelString: "value",
					fontFamily: "Times New Roman",
					fontStyle: "bold",
					fontSize: 20,
				},
				ticks: {
					autoSkip: true,
					maxTicksLimit: 3,
				},
			},
		],
	},
	zoom: {
		enabled: true,
		mode: "x",
		speed: 0.5,
	},
	pan: {
		enabled: true,
		mode: "x",
	},
};

const generateBarChartData = (logs) => {
	const data = {
		labels: ["Attentive", "Calibrating", "Inattentive"],
		datasets: [
			{
				label: "Instances of Attentiveness",
				data: [0, 0, 0],
				backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
				borderWidth: 1,
			},
		],
	};
	logs.forEach((log) => {
		const point = log.data.isCalibrating ? 0 : !log.data.isAttentive ? 1 : -1;
		data.datasets[0].data[point + 1]++;
	});
	console.log("bar", data);
	return data;
};

export { generatePieChartData, generateLineChartData, lineOptions, generateBarChartData };
