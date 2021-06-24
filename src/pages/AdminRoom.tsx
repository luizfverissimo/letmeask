import { useHistory, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  //const { user } = useAuth();
  const history = useHistory();
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    toast((t) => (
      <div className='toast-span'>
        <span>Tem certeza que você deseja excluir esta pergunta?</span>
        <button
          type='button'
          onClick={() => {
            removeQuestion().then(() => {
              toast.dismiss(t.id);
              toast.success('Pergunta removida com sucesso');
            });
          }}
        >
          Confirmar
        </button>
      </div>
    ));

    async function removeQuestion() {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }

    // if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
    //   await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    // }
  }

  return (
    <div id='page-room'>
      <Toaster />
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letme Ask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className='question-list'>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
