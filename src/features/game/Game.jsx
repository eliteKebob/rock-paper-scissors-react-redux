import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  roundIncrement,
  scoreIncrement,
  resetGame,
  setUserChoice,
  setCpuChoice,
  setMessage,
  softReset,
} from './gameSlice.js'
import styles from '../../styles/Game.module.css'
import Paper from '../../assets/paper.png'
import Rock from '../../assets/rock.png'
import Scissors from '../../assets/scissors.png'

const Game = () => {
  const { round, userScore, cpuScore, userChoice, cpuChoice, message } =
    useSelector((state) => state.game)

  const dispatch = useDispatch()

  const handleClick = (e) => {
    let img = e.target
    if (userChoice === '') {
      dispatch(setUserChoice(e.target.id))
      img.classList.add('activeUserChoice')
    }
  }

  const compareChoices = () => {
    if (userChoice !== '') {
      let arr = ['paper', 'rock', 'scissors']
      let rndCpu = Math.floor(Math.random() * 3)
      dispatch(setCpuChoice(arr[rndCpu]))
      if (userChoice === arr[rndCpu]) {
        dispatch(setMessage(`It is a draw!`))
      } else if (userChoice === 'paper') {
        if (arr[rndCpu] === 'rock') {
          dispatch(scoreIncrement('user'))
          dispatch(setMessage(`User has won this round!`))
        } else {
          dispatch(scoreIncrement('cpu'))
          dispatch(setMessage(`CPU has won this round!`))
        }
      } else if (userChoice === 'rock') {
        if (arr[rndCpu] === 'scissors') {
          dispatch(scoreIncrement('user'))
          dispatch(setMessage(`User has won this round!`))
        } else {
          dispatch(scoreIncrement('cpu'))
          dispatch(setMessage(`CPU has won this round!`))
        }
      } else if (userChoice === 'scissors') {
        if (arr[rndCpu] === 'paper') {
          dispatch(scoreIncrement('user'))
          dispatch(setMessage(`User has won this round!`))
        } else {
          dispatch(scoreIncrement('cpu'))
          dispatch(setMessage(`CPU has won this round!`))
        }
      }
    }
  }

  const handleSoftReset = () => {
    let img = document.getElementById(`${userChoice}`)
    img.classList.remove('activeUserChoice')
    dispatch(roundIncrement())
    dispatch(softReset())
  }

  const handleHardReset = () => {
    if (userChoice !== '') {
      let img = document.getElementById(`${userChoice}`)
      img.classList.remove('activeUserChoice')
    }
    dispatch(resetGame())
  }

  useEffect(() => {
    compareChoices()
    // eslint-disable-next-line
  }, [userChoice])

  return (
    <div className={styles.wrapper}>
      <div className={styles.round}>
        <p>ROUND {round}</p>
      </div>
      <div className={styles.scoreboard}>
        <p>
          User {userScore} : {cpuScore} Cpu
        </p>
      </div>
      <div className={styles.message}>
        <p>{message}</p>
      </div>
      <div className={styles.imagesWrapper}>
        <img
          src={Paper}
          alt="paper"
          id="paper"
          onClick={(e) => handleClick(e)}
          className={
            userChoice !== 'paper' && userChoice !== ''
              ? styles.disabledUserChoice
              : undefined
          }
        />
        <img
          src={Rock}
          alt="rock"
          id="rock"
          onClick={(e) => handleClick(e)}
          className={
            userChoice !== 'rock' && userChoice !== ''
              ? styles.disabledUserChoice
              : undefined
          }
        />
        <img
          src={Scissors}
          alt="scissors"
          id="scissors"
          onClick={(e) => handleClick(e)}
          className={
            userChoice !== 'scissors' && userChoice !== ''
              ? styles.disabledUserChoice
              : undefined
          }
        />
      </div>
      <div className={styles.imagesWrapper}>
        <img
          src={Paper}
          alt="paper"
          id="paper"
          className={
            cpuChoice === 'paper'
              ? styles.activeCpuChoice
              : styles.disabledCpuChoice
          }
        />
        <img
          src={Rock}
          alt="rock"
          id="rock"
          className={
            cpuChoice === 'rock'
              ? styles.activeCpuChoice
              : styles.disabledCpuChoice
          }
        />
        <img
          src={Scissors}
          alt="scissors"
          id="scissors"
          className={
            cpuChoice === 'scissors'
              ? styles.activeCpuChoice
              : styles.disabledCpuChoice
          }
        />
      </div>
      <div className={styles.buttonGroup}>
        {cpuChoice !== '' ? (
          <>
            <button onClick={() => handleSoftReset()}>New Round</button>
          </>
        ) : (
          ''
        )}
        {round > 1 ? (
          <>
            <button onClick={() => handleHardReset()}>Reset Game</button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Game
