import copyImg from '../assets/images/copy.svg'
import toast from 'react-hot-toast';

import '../styles/roomCode.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    toast('Copiado!', {
      icon: "📋"
    })
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar o código da sala" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  )
}