const metadata = require('./metadata');
const cuevana3 = require('cuevana3');


async function getMovieURLs(type, id) {

	//API machine broke

	return [{
		"latino":[
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBQmx5b2ZqemljRFk1RmUybGphTUI2ZFhTWTNzZkUwOXAza0NTSktMWW9vQ1pWSXViY2JaOEdPazE4bjBVS2NMUXhlRWUwWWhxU0ZjdGNIT0dBWFI5U2Q1RkNwdzUvUGMvVnR0Q0ZjLzJsU2cwOFVmYnZjYU5CRjNGMVdYNTBRTEp0Y0RGRVphTkJuanJkLzRkNTN3QksrK09IMVlYaFh4K003T1ZnVlhrdVJtNnArK2N0SXJaQ1JiSkR4TENmaHNrcmhYeHpLWlFkOHlmYm5EU0oyUjgxZHFOaFErVUxvWGhtRTdHaUtGZ29Na0tFQkVQMDZlK1ZuU1B2ZnhFYTJuaUo5SUg0OUROREJoNGFxNHFJUm5PWWIvajV2RjJtbm4xb3h6Q0VwRDhxV3ZRYnNpR0U2VlBtL2FLYitjVE9CS0lRPT0"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=M2ZZdHVZWUxWTWs0NXJNUzBsMmZvbWJiZCtHTm9zUy82bFgvUEdCMnhpNDhRL0dXTENuL3VpTUI4SUNzQk42Qw"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBTHR0alNycDZ1OHpHeFNQeDhKRlNNenVHeVRjWmtUOGQvT0h1b0doTFZHNURJSWJmN3ZhTmovOFNXbGpkUHZGb3BHbmFJV2JXMll4ckxocVo3MnRxdFZRODZKcktiS25URTV5RW1QUWp5SllRdHVvY092NTlvV2Q4RThIUG9zVzFEZ3ZvVEVXbmFvMzB2TXl4TDZIUFZZNWxZK011d1ZMYWszbmZERmV4TVM5"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=N3FEb3l2dU80U0MyZ1dJSlBWY2pqdnFDdFZLeUFwamNFU1NSeVAxMVlyWGZxY2ZQNExjYlVpREdtY25DcXV4RkpSQWtaMVJ1Tnp6ZnVSM1VzRmZRNHc9PQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvdklCSFFxT2M5cWR3RlY4Tk5VSnh5V1FOZW03T3RtdXNIZElGMDd3WC9PNzE2b2p5cWdJYUU0K0V4Tit5d3J6enc9PQ"
		},
		{
		"url":"https://api.cuevana3.me/fembed/?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvdkErRnN6WDd4KzJGYkRsWk9ERGQzcXVYY2wwS1V3dmxVbnJZTnpNVUlLMFBBZGtsZ1NTZVNocTNNMWdHVm9od2c9PQ"
		},
		{
		"url":"https://api.cuevana3.me/fembed/?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvbUgrUjkxNzEwc1k3MS9OdVNsaTR6UGZNU015N0oxcEZvaDMrdHZyV3M5SlcwU3pxbGZ3b09VRzdZVm9zeXR2dGc9PQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=MGFwOElmcDBEcW9ld0dpQ2xxb3VBVk0zcVQzcE0wN0ZPWlhwSVZNeXJ4TkZpQUZERG1PcGxRM1dFTnA2VStrSg"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=c2J0eVl0MnRCR3poVVJsKzg1UVplVlk4N2YxQmxBS3VLUTFydW1HRHhSLzBiYmVaUCtOVlBjVVl2b3h4MW9qVQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=Vm5aYVdvRWJVK1E2N2FXaGtST1dxU2tybmFiVVIvU1AwOW8ycEFwc1B3ZFBESHJKNUpFcG9jNzA3S0gvM2xrTXA1c3RLSTQyOXI1cE15eWc0K1R2cHc9PQ"
		}
		],
		"espanol":[
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBQmx5b2ZqemljRFk1RmUybGphTUI2ZFhTWTNzZkUwOXAza0NTSktMWW9vQ1pWSXViY2JaOEdPazE4bjBVS2NMUXhlRWUwWWhxU0ZjdGNIT0dBWFI5U2VoZzBKM2VxeW9GN2xPQ3FvSVRNSG9ENGpLOUlsYUdka050VnA4NVg5UWtKNDdsV2Y0M0lGb2pKRE9QSERRU3pmNVlrcjU1d2MrT2Y1TUh6bENndzFubDVUaUtsU2JHTktZMHN6bVBpL2NNaVR0ZnlDaHJNbFpKQldCa2xBTTlyYXVGenZaV3EzdjBTTGY2MlVJYnNwQm0zTVhUR1VMZldxbWM2OUxjRGR0VmJ5eXZYNGhDamR2THQ3K1FycjhEOE5zK0xTK0N5eWVocm9UQjNlREdnUVhnUDFDcEFya0phN2NaK1o0bzVTVmN3PT0"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBTHR0alNycDZ1OHpHeFNQeDhKRlNNenVHeVRjWmtUOGQvT0h1b0doTFZHNVVHN1NMVjN5N3JldjRaYnlYamd1Y0hydnlCZTdkMkloT3Q5TzZOTVVtL1NQQ2tvKzNJTlJYTWdPSnBLOUZMZ0dnaytEZjltcW9uUllUUjA4U0FEaXF6WlpIM3hFV01rT2U0VUFob3pYb3hRbk1nYS9RV0JQWlBMNWZxWDNQY0t3"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=M2ZZdHVZWUxWTWs0NXJNUzBsMmZvdnVWdkFRZ2srLzFLNUN6NTc1bkllUEJzTEk2OWZLeDR2SndqUFV0Ui9pMg"
		},
		{
		"url":"https://api.cuevana3.me/fembed/?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvZ1ZuWVhOU1B3WmJvdmlwRHVVVEF0UEVVRW9MMm83T3RGTnlqQUJONWVsaVc5WE5KNVFNaFY4SVJmWENYQzdQUUE9PQ"
		},
		{
		"url":"https://api.cuevana3.me/fembed/?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvZ3p1NURuZzltRFlZMkNxNWhSRWxDUzF4MTBBRmVOV1EyM1RmaW1sejUwdEJjOVhlZHFjamNQQUNWbUlBMGpienc9PQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=Mzl1NXQxSnN5WlMwek0yY2NUUDl0NXdFTEkvT3BQd0RKN0RUMFJrTjh5dUdjSG1TaWZiMWZkMmlnUHg4NCs5YlM1WVpTRmVZSnoyRWlPdldsanIxRS9JQzlOZVdCTkRIVWxqZk5FYW1TQXdKTkdTQU5SK2ZwNyt5VzUzQzFITzgvZ01HSjdNTXhvRTFBSGgvb3hkaGxRPT0"
		}
		],
		"sub":[
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBQmx5b2ZqemljRFk1RmUybGphTUI2ZFhTWTNzZkUwOXAza0NTSktMWW9vQ1pWSXViY2JaOEdPazE4bjBVS2NMUXhlRWUwWWhxU0ZjdGNIT0dBWFI5U2NEMUFoREJCcmxEWHdKU0tyajFNTXpFVWpBQUFOTkdTTGw0T2Q3eVVFYyt0bHowdkI2RWJUUmkrcXRoQy9JSkVnQTBZRVRWdlVKQ1RpbUk0dnFxVkU2M1lKSzRtUlpPbmJhTkkwcjNoU1NkSnA5Z0gybTZFdklaaWdyNmRwYXhuaTUrVEM0WWl2d2pmdW9NSjNQU3FMZitrSlZlcmtUajRRV2NtdGQzb2hWM2VUVFNWcVB0NDBMWGZMY250SXBJTlp1a05OT1JjVlVBZDZrWE5pWWszYnZkYU9rMDBQYTRYQ2ZqWDNTNUFoRXZBPT0"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=M2ZZdHVZWUxWTWs0NXJNUzBsMmZvcUhScHlkQVl6TlZwbkJEdWhrWnYwdTRMeTJhUWVnMG5nVVN4TGVvZ0tCWQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBTHR0alNycDZ1OHpHeFNQeDhKRlNNenVHeVRjWmtUOGQvT0h1b0doTFZHNUdDVkgrcSt5QWtWUnV2NzFoS2N6dFUyc1hza3A0bnFzUEtUa1lCSDhwckYramhVWlRzenNiRUhMNG9iU3pZS0dBYkR2SitIZ3BPOSs2R0lxSS9MUjRGL2dwd013MVc0WmcyY1Y2bmFZM3dIbVZhN1ZocDcxOUtUbkw2VysvcjhX"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=N3FEb3l2dU80U0MyZ1dJSlBWY2pqbFhpU0k4TEhPVUlvN205QW9Cd25ucndiZnRJTldKZWpTL2xTUGo3TmFYbEQ0dGVURk9tL0ZscW54bGRiOVpiYlE9PQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvZ0Fpb0piVWx3SmNqUldGam5TZk1GMERTNUhOa0UzWi9hY3dWalo1ZHRnKzRITXhOL1ZveGc2dStVMEpMVUVUdGc9PQ"
		},
		{
		"url":"https://api.cuevana3.me/fembed/?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvaFhMTWVWWUtVZUxCdjJ1TEc0NUhhSElOVTd2S1VYQlEwRWtnZDhVZzkvRkl5V0NHOHZWa0xFTFR1dVptQm4yRWc9PQ"
		},
		{
		"url":"https://api.cuevana3.me/fembed/?h=aUJjeGt5eWFpaGV5Szc2RGQ0OVdvZ1ZuWVhOU1B3WmJvdmlwRHVVVEF0T1lTOWdueHBXa2wxbi9qK1BrUVlieVFRTmdhOWJNNXU2SmxWK2pKc0N4WHc9PQ"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=c2J0eVl0MnRCR3poVVJsKzg1UVplUTQ2MG5LMHBncXBQc3dhY0N6SUlrcEtFK25VSks1Yk9ydHpwZ1dQcDd6cw"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=Mzl1NXQxSnN5WlMwek0yY2NUUDl0NXdFTEkvT3BQd0RKN0RUMFJrTjh5dTRkUFRMSld0OVUxMHk1dHVrT1MveStvaWk4UTNXcURReXR3UG5lZE5CUXU1MDlWWTd5NkpQekFOL0lMSVVFM2pqZFNlWGQvMG9LSmNNZ1dqclBhTXZIWk54c3dzWjdMYkY0ZVgwTTdBU3JnPT0"
		},
		{
		"url":"https://apialfa.tomatomatela.com/ir/player.php?h=Vm5aYVdvRWJVK1E2N2FXaGtST1dxYVVsYjJDTjRCVS9veW5xR2toWWJOTXVvLzdXUHZDWWNjRVFMejBYNXR1QXl3eTBMbGhQSGphNjArU09xaWZXamc9PQ"
		}
		]
		}];
	
}

module.exports = {
    getMovieURLs,
}