fetch('https://api.monobank.ua/personal/auth/request', {
	method: 'POST',
	body: JSON.stringify({
		tokenRequestId: 'uDJOZ7Eg00wSuWnCPKMK2qhuGS8e9JWxdkyqz51p_e4o',
		acceptUrl: 'https://mbnk.app/auth/uDJOZ7Eg00wSuWnCPKMK2qhuGS8e9JWxdkyqz51p_e4o',
	}),
    headers: {
        "X-Time": new Date().getTime()
    }
})
	.then(res => res.json())
	.then(data => console.log(data))