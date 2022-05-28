import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    round: 1,
    userScore: 0,
    cpuScore: 0,
    userChoice: '',
    cpuChoice: '',
    message: 'Select your choice',
  },
  reducers: {
    roundIncrement: (state) => {
      state.round += 1
    },
    scoreIncrement: (state, arg) => {
      if (arg.payload === 'user') {
        state.userScore += 1
      } else {
        state.cpuScore += 1
      }
    },
    resetGame: (state) => {
      state.round = 1
      state.gameOver = false
      state.userScore = 0
      state.cpuScore = 0
      state.userChoice = ''
      state.cpuChoice = ''
      state.message = 'Select your choice'
    },
    setUserChoice: (state, arg) => {
      state.userChoice = arg.payload
    },
    setCpuChoice: (state, arg) => {
      state.cpuChoice = arg.payload
    },
    setMessage: (state, arg) => {
      state.message = arg.payload
    },
    softReset: (state) => {
      state.userChoice = ''
      state.cpuChoice = ''
      state.message = 'Select your choice'
    },
  },
})

export const {
  roundIncrement,
  scoreIncrement,
  resetGame,
  setUserChoice,
  setCpuChoice,
  setMessage,
  softReset,
} = gameSlice.actions

export default gameSlice.reducer
