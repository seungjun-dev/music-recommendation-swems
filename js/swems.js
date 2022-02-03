import Chart from '@toast-ui/chart'
import '@toast-ui/chart/dist/toastui-chart.min.css';

const el = document.getElementById('chart');
const data = {
    categories: ['Sweet', 'Warm', 'Enthusiastic', 'Modern', 'Sorrow'],
    series: [
        {
            name: '위잉위잉',
            data: [1.40, 3.08, 4.60, 4.57, 3.02],
        },
        {
            name: 'Gee',
            data: [6.13, 4.67, 5.53, 3.89, 1.00],
        },
        {
            name: '롤리폴리',
            data: [3.60, 3.61, 5.49, 2.84, 1.11],
        },
        {
            name: '봄이좋냐',
            data: [5.13, 5.75, 3.78, 3.89, 2.02],
        },
    ],
};

const options = {
    chart: { width: 700, height: 400 },
    series: {
        showArea: true
    }
}

const chart = Chart.radarChart({ el, data, options });
//const chart = new RadarChart({ el, data, options });

$.ajax({
    url: 'data_utf8.csv',
    dataType: 'text',
}).done(successFunction);

function successFunction(res) {
    songList = decodeURI(res);
    console.log(songList);
}