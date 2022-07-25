// import { writable } from 'svelte/store';

// // import Home from "../../containers/Home.svelte";
// // import Water from "../../containers/Water.svelte";


// // export const componentData = [Home, Water] };

// // // function travelComponents() {
// // // 	const { subscribe, set } = writable(Home);

// // // 	return {
// // // 		subscribe,
// // // 		travel: () => set(componentData[0]),
// // // 	};
// // // }

// // export const component = travelComponents(0);


// function createCount() {
// 	const { subscribe, set, update } = writable(0);

// 	return {
// 		subscribe,
// 		increment: () => update(n => n + 1),
// 		decrement: () => update(n => n - 1),
// 		reset: () => set(0)
// 	};
// }

// // export const component = writable("Home");
// export const count = createCount();


import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
			subscribe,
			increment: () => update(n => n + 1),
			decrement: () => update(n => n - 1),
			reset: (n) =>  { set(n); }
	};
}

export const count = createCount();

