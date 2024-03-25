import {
  wait,
  waitWhilePaused,
  updateColours,
} from "../components/SorterUtils";

// ------------Heap Sort------------
export const heapSort = async (
  arr,
  l,
  r,
  dispatch,
  paused,
  endSort,
  delay,
  red
) => {
  const n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await max_heapify(arr, n, i, dispatch, paused, endSort, delay);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    dispatch({ type: "setElements", payload: [...arr] });
    updateColours(dispatch, [0, i], []); // Update colours to highlight the swap
    await wait(delay.current); // Introduce a delay for visualization

    red.push(i);
    dispatch({ type: "setRed", payload: [...red] });

    // call max heapify on the reduced heap
    await max_heapify(arr, i, 0, dispatch, paused, endSort, delay);
  }
  // Clear colours after sorting is done
  updateColours(dispatch, [], []);
  dispatch({ type: "setRed", payload: [] });
};
export const max_heapify = async (
  arr,
  n,
  i,
  dispatch,
  paused,
  endSort,
  delay
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = left + 1;

  await waitWhilePaused(paused, endSort);
  if (endSort.current) return;

  // focusing on the elemnts
  if (right < n) updateColours(dispatch, [largest], [left, right]);
  else if (left < n) updateColours(dispatch, [largest], [left]);

  await wait(delay.current);

  await waitWhilePaused(paused, endSort);
  if (endSort.current) return;

  // swapping indexes based on their values
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    // swapping values
    updateColours(dispatch, [i, largest], []);
    await wait(delay.current);

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    dispatch({ type: "setElements", payload: arr });
    await wait(delay.current);

    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;

    // clear focused elements
    updateColours(dispatch, [], []);
    // recurse to heapify the array
    await max_heapify(arr, n, largest, dispatch, paused, endSort, delay);
  } else {
    // clear focused elements
    updateColours(dispatch, [], []);
  }
};

// ------------Quick Sort------------
export const quickSort = async (
  arr,
  low,
  high,
  dispatch,
  paused,
  endSort,
  delay,
  red
) => {
  if (low < high) {
    let pi = await partition(arr, low, high, dispatch, paused, endSort, delay);
    await Promise.all([
      quickSort(arr, low, pi - 1, dispatch, paused, endSort, delay, red),
      quickSort(arr, pi + 1, high, dispatch, paused, endSort, delay, red),
    ]);
  }

  dispatch({ type: "setGreen", payload: [] });
};

export const partition = async (
  arr,
  low,
  high,
  dispatch,
  paused,
  endSort,
  delay
) => {
  let pivot = arr[high];
  dispatch({ type: "setOrange", payload: [high] });
  let i = low - 1;

  for (let j = low; j < high; j++) {
    dispatch({ type: "setGreen", payload: [j] });
    await wait(delay.current);

    if (arr[j] < pivot) {
      i++;
      // Highlight elements to be swapped
      dispatch({ type: "setGreen", payload: [i, j] });
      wait(delay.current);

      // Perform the swap
      [arr[i], arr[j]] = [arr[j], arr[i]];
      dispatch({ type: "setElements", payload: [...arr] });
      // Keep the highlight a bit after swap for visual feedback
    }
    await wait(delay.current);
    if (endSort.current) {
      return;
    }
    await waitWhilePaused(paused, endSort);
    if (endSort.current) {
      return;
    }
  }

  // Final swap to place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  dispatch({ type: "setElements", payload: [...arr] });
  dispatch({ type: "setGreen", payload: [i + 1] });
  dispatch({ type: "setGreen", payload: [] });
  await wait(delay.current);
  return i + 1;
};

// ------------Merge Sort------------
export const mergeSort = async (
  arr,
  l,
  r,
  dispatch,
  paused,
  endSort,
  delay,
  red
) => {
  if (l >= r) {
    return arr;
  }
  // split the array
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(arr, l, m, dispatch, paused, endSort, delay, red);
  await mergeSort(arr, m + 1, r, dispatch, paused, endSort, delay, red);
  await merge(arr, l, m, r, dispatch, paused, endSort, delay);
  if (endSort.current) return;
};
export const merge = async (
  arr,
  start,
  middle,
  end,
  dispatch,
  paused,
  endSort,
  delay
) => {
  const n1 = middle - start + 1;
  const n2 = end - middle;
  let L = new Array(n1);
  let R = new Array(n2);
  let Lindices = Array.from({ length: n1 }, (_, i) => start + i);
  let Rindices = Array.from({ length: n2 }, (_, i) => middle + 1 + i);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[start + i];
  for (let j = 0; j < n2; j++) R[j] = arr[middle + 1 + j];

  updateColours(dispatch, Lindices, Rindices);

  let i = 0,
    j = 0,
    k = start;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];

      // updating the coloured elements
      Rindices[Rindices.indexOf(j + middle + 1)] = k;
      Lindices[Lindices.indexOf(k)] = j + middle + 1;
      updateColours(dispatch, Lindices, Rindices);

      j++;
    }
    k++;
    dispatch({ type: "setElements", payload: [...arr] });

    if (endSort.current) return;
    await wait(delay.current);
    await waitWhilePaused(paused, endSort);
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }

  dispatch({ type: "setElements", payload: [...arr] });
  await waitWhilePaused(paused, endSort);
  if (endSort.current) return;
  await wait(delay.current);
  updateColours(dispatch, [], []);
};

// ------------Bubble Sort------------
export const bubbleSort = async (
  arr,
  l,
  r,
  dispatch,
  paused,
  endSort,
  delay
) => {
  let sorted = true;
  const red = [];
  while (true) {
    for (let i = l; i < r; i++) {
      // focused elements
      updateColours(dispatch, [i, i + 1], []);

      // swap if the element found is greater than the next element
      if (arr[i] > arr[i + 1]) {
        // check for wait for exit
        await waitWhilePaused(paused, endSort);
        if (endSort.current) return;

        await wait(delay.current);
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        dispatch({ type: "setElements", payload: arr });
        sorted = false;
      }

      // check for wait for exit
      await waitWhilePaused(paused, endSort);
      if (endSort.current) return;

      // remove focused elements
      await wait(delay.current);
      updateColours(dispatch, [], []);
    }
    if (sorted) {
      break;
    }
    // sorted end elements
    red.push(r);
    dispatch({ type: "setRed", payload: red });

    r--;
    sorted = true;
  }

  dispatch({ type: "setRed", payload: [] });
  // check for wait for exit
  await waitWhilePaused(paused, endSort);
  if (endSort.current) return;
};

// ------------Selection Sort------------
export const selectionSort = async (
  arr,
  l,
  r,
  dispatch,
  paused,
  endSort,
  delay
) => {
  const red = [];
  for (let i = l; i < r; i++) {
    dispatch({ type: "setRed", payload: red });

    dispatch({ type: "setOrange", payload: [i] });

    // exit or pause
    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;
    await wait(delay.current);

    for (let j = i + 1; j < r + 1; j++) {
      dispatch({ type: "setGreen", payload: [j] });
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await wait(delay.current);
        dispatch({ type: "setElements", payload: arr });
      }
      // exit or pause
      await waitWhilePaused(paused, endSort);
      if (endSort.current) return;
      await wait(delay.current);
    }
    red.push(i);
  }
};

// ------------Insertion Sort------------
export const insertionSort = async (
  arr,
  l,
  r,
  dispatch,
  paused,
  endSort,
  delay,
  red
) => {
  for (let i = l; i < r; i++) {
    dispatch({ type: "setGreen", payload: [i, i + 1] });
    await wait(delay.current);

    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

      await wait(delay.current);
      dispatch({ type: "setElements", payload: arr });

      await waitWhilePaused(paused, endSort);
      if (endSort.current) return;

      let j = i;
      dispatch({ type: "setGreen", payload: [j, j - 1] });
      while (j > 0 && arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        await wait(delay.current);
        dispatch({ type: "setElements", payload: arr });

        await waitWhilePaused(paused, endSort);
        if (endSort.current) return;
        j--;
        dispatch({ type: "setGreen", payload: [j, j - 1] });
      }
    }
  }
  dispatch({ type: "setGreen", payload: [] });
};
