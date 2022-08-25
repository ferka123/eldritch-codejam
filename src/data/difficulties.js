const difficulties = [
  {
    id: 'very_easy',
    name: 'Очень легкая',
    scheme: ['easy','normal'],
    shuffle: false
  },
  {
    id: 'easy',
    name: 'Легкая',
    scheme: ['easy','normal'],
    shuffle: true
  },
  {
    id: 'normal',
    name: 'Средняя',
    scheme: ['easy','normal','hard'],
    shuffle: true
  },
  {
    id: 'hard',
    name: 'Высокая',
    scheme: ['normal','hard'],
    shuffle: true
  },
  {
    id: 'very_hard',
    name: 'Высокая',
    scheme: ['hard','normal'],
    shuffle: false
  },
]

export default difficulties