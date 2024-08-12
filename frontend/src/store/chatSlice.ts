import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    thread: null,
    messages: [
      {
        role: 'assistant',
        text: 'Hello, how can I help you?'
      }
    ]
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setThread: (state, action) => {
      state.thread = action.payload
    }
  }
})

export const { addMessage, setThread } = chatSlice.actions
export default chatSlice.reducer