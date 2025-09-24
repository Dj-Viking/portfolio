// TODO: for light dark theme saving
export function LocalStorage() {
	this.localStorage = window.localStorage;

	this.init = (_default = true, initopts = {
		entry: {
			key: "key",
			val: "val"
		},
		anotherentry: {
			key: "key",
			val: "val"
		}
	}) => {

		if (_default) {
			console.warn("using fallback local storage key value pairs");
		}

		Object.values(initopts).forEach((entry) => {
			if (!this.localStorage.getItem(entry.key)) {
				this.localStorage.setItem(entry.key, entry.val);
			}
		});

	}

	this.request = (reqopts = {
		method: "get",
		key:    null,
		val:    null,
	}) => {
		if (reqopts.method === "get" 
			&& reqopts.key !== null)
		{
			return this.localStorage.getItem(reqopts.key);
		}

		if (reqopts.method === "set" 
			&& reqopts.key !== null
			&& reqopts.val !== null)
		{
			this.localStorage.setItem(reqopts.key, reqopts.val);
		}
	}

	return this;
}
