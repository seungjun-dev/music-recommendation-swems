$.ajax({
    url: "../data/swems.json",
    dataType: "json",
}).done(function (res) {
    const grid = new tui.Grid({
        el: document.getElementById("grid"),
        width: "50%",
        data: res,
        pageOptions: {
            useClient: true,
            perPage: 15,
        },
        scrollX: false,
        scrollY: false,
        //ID,TITLE,ARTIST,SWEET,WARM,ENTHUSIASTIC,MODERN,SORROW,SCORE
        columns: [
            {
                header: "ID",
                name: "id",
                width: "auto",
            },
            {
                header: "TITLE",
                name: "title",
                width: "auto",
            },
            {
                header: "ARTIST",
                name: "artist",
                width: "auto",
            },
            {
                header: "SWEET",
                name: "sweet",
                width: "auto",
            },
            {
                header: "WARM",
                name: "warm",
                width: "auto",
            },
            {
                header: "ENTHUSIASTIC",
                name: "enthusiastic",
                width: "auto",
            },
            {
                header: "MODERN",
                name: "modern",
                width: "auto",
            },
            {
                header: "SORROW",
                name: "sorrow",
                width: "auto",
            },
        ],
    });

    tui.Grid.applyTheme("striped");

    grid.on("click", getSwemsData);

    function getSwemsData(res) {
        const rowData = grid.getRowAt(res.rowKey);
        console.log(rowData);

        $("#chart").empty();

        drawChart(rowData);
    }

    function drawChart(rowData) {
        const Chart = toastui.Chart;

        const el = document.getElementById("chart");
        const data = {
            categories: ["Sweet", "Warm", "Enthusiastic", "Modern", "Sorrow"],
            series: [
                {
                    name: rowData.title,
                    data: [
                        rowData.sweet,
                        rowData.warm,
                        rowData.enthusiastic,
                        rowData.modern,
                        rowData.sorrow,
                    ],
                },
            ],
        };

        const options = {
            chart: {
                title: rowData.title,
                width: 700,
                height: 400,
            },
            series: {
                showArea: true,
            },
        };

        const chart = Chart.lineChart({ el, data, options });
    }
});
