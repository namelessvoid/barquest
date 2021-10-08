import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { CharacterEditor } from './CharacterEditor';
import { CharacterSelection } from './CharacterSelection';

export const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to BarQuest</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CharacterEditor />
        <CharacterSelection />
      </IonContent>
    </IonPage>
  )
}