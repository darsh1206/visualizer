export const waitWhilePaused = (paused, endSort) =>
  new Promise((resolve) => {
    const checkPause = setInterval(() => {
      if (!paused.current || endSort.current) {
        clearInterval(checkPause);
        resolve();
      }
    }, 100);
  });

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateSpeed = (delay, newSpeed) => {
  delay.current = 800 - newSpeed;
};

export const updateColours = (dispatch, Green, Orange) => {
  dispatch({ type: "setGreen", payload: Green });
  dispatch({ type: "setOrange", payload: Orange });
};

export const EndSort = async (endSort, delay, dispatch) => {
  endSort.current = true;
  const temp = delay.current;
  delay.current = 0;
  await wait(500);
  updateColours(dispatch, [], []);
  dispatch({ type: "setRed", payload: [] });
  endSort.current = false;
  delay.current = temp;
};

export const randomizeElements = async (
  size,
  dispatch,
  sortStatus,
  setSortStatus,
  sorting,
  endSort,
  delay
) => {
  if (sorting.current) await EndSort(endSort, delay, dispatch);
  const newElements = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100 + 1)
  );
  dispatch({ type: "setElements", payload: newElements });
  setSortStatus("Start");
  sorting.current = false;
};

export const handleSortControl = (
  sortStatus,
  setSortStatus,
  sorting,
  paused,
  sort,
  elements,
  dispatch
) => {
  if (sortStatus === "Start" || sortStatus === "Resume") {
    if (!sorting.current) {
      sorting.current = true;
      paused.current = false;
      setSortStatus("Pause");
      sort([...elements], 0, elements.length - 1, dispatch).then(() => {
        setSortStatus("Start");
        sorting.current = false;
        updateColours(dispatch, [], []);
        dispatch({ type: "setRed", payload: [] });
      });
    } else {
      paused.current = false;
      setSortStatus("Pause");
    }
  } else if (sortStatus === "Pause") {
    paused.current = true;
    setSortStatus("Resume");
  }
};
