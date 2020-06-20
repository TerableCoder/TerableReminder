module.exports = function TerableReminder(mod) {
	const command = mod.command || mod.require.command;
	const notifier = mod.require.notifier

	let timeouts = [],
		counter = 0;

	command.add(['terar', 'rem'], {
		$default(){
			command.message(`rem add seconds msg`);
			command.message(`rem list`);
		},
		add(seconds, ...msg){
			const tmpCounter = counter;
			msg = msg.join(' ').toString();
			timeouts.push({counter: counter++, msg: msg});
			setTimeout(() => {
				notifier.message(msg);
				command.message(msg);
				let index = timeouts.findIndex(element => element.counter == tmpCounter);
				timeouts.splice(index, 1);
			}, seconds*1000);
		},
		list(){
			for(let i = 0; i < timeouts.length; i++){
				command.message(`${timeouts[i].counter}: ${timeouts[i].msg}`);
			}
		}
	});
}