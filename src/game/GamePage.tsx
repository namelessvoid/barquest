import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useEffect } from 'react';
import { CurrentActivityComponent } from './components/CurrentActivityComponent';
import { PlayerDetailsComponent } from './components/PlayerDetailsComponent';
import { ActivityLogComponent } from './components/ActivityLogComponent';
import { selectName, startGame } from './playerSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { StoryComponent } from './components/StoryComponent';
import { useParams } from 'react-router';

export const GamePage: React.FC = () => {
  const { gameId } = useParams<{gameId: string}>()

  const playerName = useAppSelector(selectName);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startGame(gameId))
  }, [gameId])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{playerName}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{playerName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-lg="6">
              <CurrentActivityComponent />
              <ActivityLogComponent />
            </IonCol>
            <IonCol size="12" size-lg="6">
              <PlayerDetailsComponent />
              <StoryComponent />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
