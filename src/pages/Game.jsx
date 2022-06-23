import { useState, useEffect, useReducer } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useGameData } from '../contexts/GameData';
import LoadedImagesCountProvider from '../contexts/LoadedImagesCount';
import Screen from '../components/game/Screen';
import Stopwatch from '../components/game/Stopwatch';
import Board from '../components/game/Board';
import FloatingWindow from '../components/game/FloatingWindow';
import ReportWindow from '../components/game/ReportWindow';
import GameClearedWindow from '../components/game/GameClearedWindow';

export const ACTIONS = {
  SET_DATA: 'set-data',
  SET_CLICKED_DIV: 'set-click-div',
  SET_TARGET_FOUND: 'set-target-found'
};

function reducer(data, action) {
  switch (action.type) {
    case ACTIONS.SET_DATA:
      return ({ 
        ...action.payload.newData,
        targetsFound: 0,
        targets: action.payload.newData.targets.map(
          target => ({ 
            ...target, 
            located: false 
          })
        )
      });
    case ACTIONS.SET_CLICKED_DIV: 
      return ({
        ...data,
        clickedDiv: `-${action.payload.div}-`
      });
    case ACTIONS.SET_TARGET_FOUND:
      return ({
        ...data,
        targetsFound: (data.targetsFound + 1),
        targets: data.targets.map(
          (target, index) => index === action.payload.targetIndex ? (
            { ...target, located: true }
          ) : ( target )
        )
      });
    default:
      return data;
  }
}

export default function Game() {
  const gameData = useGameData();
  const { location } = useParams();

  const [data, dispatchData] = useReducer(reducer, {});
  const [gameDataReceived, setGameDataReceived] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [mountFloatingWindow, setMountFloatingWindow] = useState(false);
  const [floatingWindowPosition, setFloatingWindowPosition] = useState({});
  const [report, setReport] = useState('');
  const [mountReportWindow, setMountReportWindow] = useState(false);
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    if (gameData.length > 0) setGameDataReceived(true);
  }, [gameData]);

  useEffect(() => {
    if (gameDataReceived) {
      const index = gameData.findIndex(({ name }) => (name === location));
      if (index > -1) {
        dispatchData({
          type: ACTIONS.SET_DATA,
          payload: { newData: gameData[index] }
        });
      } else {
        setDataNotFound(true)
      }
    }
  }, [gameDataReceived, gameData, location]);

  if (dataNotFound === true) {
    return (<Navigate replace to='/' />);
  }

  if (gameTime) {
    return (
      <GameClearedWindow 
        location={location}
        msec={gameTime}
      />
    );
  }

  const handleBoardClick = (e, num) => {
    if (`-${num}-` !== data.clickedDiv) {
      dispatchData({
        type: ACTIONS.SET_CLICKED_DIV,
        payload: { div: num }
      });
    }
    if (!mountFloatingWindow) setMountFloatingWindow(true);
    const rect = e.target.getBoundingClientRect();
    setFloatingWindowPosition({
      x: Math.round(e.target.offsetLeft + (e.clientX - rect.left)),
      y: Math.round(e.target.offsetTop + (e.clientY - rect.top))
    });
  };

  const showReportAndUnmountFloatingWindow = (text) => {
    setReport(text);
    setMountReportWindow(true);
    setMountFloatingWindow(false)
  };

  const checkSelectedTarget = (target, index) => {
    let report;
    if (target.coords.includes(data.clickedDiv)) {
      dispatchData({
        type: ACTIONS.SET_TARGET_FOUND,
        payload: { targetIndex: index }
      });
      report = `You found ${target.name.toUpperCase()}!`;
    } else {
      report = `That's not ${target.name.toUpperCase()}!`;
    }
    showReportAndUnmountFloatingWindow(report);
  };

  return ((Object.keys(data).length === 0) ? (
    <p className='animate-pulse'>loading data...</p>
  ) : (
    <LoadedImagesCountProvider>
      <Screen targets={data.targets}>
        <Stopwatch 
          targetsFound={data.targetsFound}
          callBack={setGameTime}
        />
      </Screen>
      <Board 
        backgroundURL={data.url} 
        onDivClick={handleBoardClick}
      >
        {mountFloatingWindow && (
          <FloatingWindow 
            targets={data.targets}
            selectTarget={checkSelectedTarget}
            x={floatingWindowPosition.x}
            y={floatingWindowPosition.y}
            unmountTrigger={() => setMountFloatingWindow(false)} 
          />
        )}
        {(mountReportWindow && !mountFloatingWindow) && (
          <ReportWindow
            message={report}
            x={floatingWindowPosition.x}
            y={floatingWindowPosition.y}
            callBack={() => setMountReportWindow(false)}
          />
        )}
      </Board>
    </LoadedImagesCountProvider>
  ));
};
