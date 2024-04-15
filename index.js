import * as data from "./data.js";
import Chart from "chart.js/auto";

(async function () {
	let json = data.data;
	const d = data.data.slice(0, 10);
	const positionTitles = [];

	// Iterate through the array of objects
	json.forEach((obj) => {
		const positionTitle = obj.POSITION_TITLE;

		// Check if the POSITION_TITLE value is not already in the array, then add it
		if (!positionTitles.includes(positionTitle)) {
			positionTitles.push(positionTitle);
		}
	});

	const coachPositions = json.filter((obj) =>
		obj.POSITION_TITLE.toLowerCase().includes("coach")
	);

	// Output the result
	console.log(coachPositions);
	d.sort((a, b) => a.YEAR - b.YEAR);
	console.log(d);
	const barData = {
		type: "bar",
		data: {
			labels: data.yearCountArray.map((arr) => arr[0]),
			datasets: [
				{
					label: "Faculty",
					data: data.yearCountArray.map((arr) => arr[1]),
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          borderColor: "#000000",
          borderWidth: 1
				},
			],
		},
    
	};
	new Chart(document.getElementById("bar"), barData);

	const lineD = {
		labels: data.yearCountArray.map((x) => x[0]),
		datasets: [
			{
				label: "Coach",
				data: Object.entries(data.yearlyCoachMedianPay).map((v) => v), // list of median salary per year
				borderColor: "#00FF00",
				backgroundColor: "#00FF00",
			},
			{
				label: "Professor",
				data: Object.entries(data.yearlyProfMedianPay).map((v) => v),
				borderColor: "#000000",
				backgroundColor: "#000000",
			},
		],
	};
	const lineD2 = {
		labels: data.yearCountArray.map((x) => x[0]),
		datasets: [
			{
				label: "Coach",
				data: Object.entries(data.avgCoachYearlyPay).map((v) => v), // list of median salary per year
				borderColor: "#00FF00",
				backgroundColor: "#00FF00",
			},
			{
				label: "Professor",
				data: Object.entries(data.avgProfYearlyPay).map((v) => v),
				borderColor: "#000000",
				backgroundColor: "#000000",
			},
      {
				label: "Adjusted Professor salary from 2010",
				data: Object.entries(data.adjustedPayoutFrom2010).map((v) => v),
				borderColor: "#000000",
				backgroundColor: "#FFFFFF",
        borderDash: [5,5]
			},
      {
				label: "Adjusted Coach salary from 2010",
				data: Object.entries(data.coachAdjustedPayoutFrom2010).map((v) => v),
				borderColor: "#00FF00",
				backgroundColor: "#FFFFFF",
        borderDash: [5,5]
			},
		],
	};

	const lineData = {
		type: "line",
		data: lineD,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: true,
					text: "Median Coach vs Professor Pay by Year",
				},
			},
		},
	};
	const lineData2 = {
		type: "line",
		data: lineD2,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: true,
					text: "Average Coach vs Professor Pay by Year",
				},
			},
		},
	};

	new Chart(document.getElementById("line"), lineData);

	new Chart(document.getElementById("line2"), lineData2);

  let valueOfDollarIn2010 = 62370.69;

// Calculate the value of a dollar for each subsequent year

const valueOfDollarByYear = { "2010": valueOfDollarIn2010 };
for (let year = 2011; year <= 2023; year++) {
  // Apply the inflation rate to the value of a dollar in the previous year
  valueOfDollarIn2010 *= (1 + data.inflationData[year] / 100);

  // Store the adjusted value of a dollar for the current year
  valueOfDollarByYear[year.toString()] = valueOfDollarIn2010;
}

// Output the result
console.log(valueOfDollarByYear);
})();

// Call the function when the page loads
