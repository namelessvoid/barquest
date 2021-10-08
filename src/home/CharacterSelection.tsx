import { IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { SaveGameInfo, SaveGameService } from '../game/SaveGameService';

export const CharacterSelection: React.FC = () => {
  const [ saveGames, setSaveGames ] = useState<SaveGameInfo[]>([]);
  useEffect(() => {
    SaveGameService.listSaveGames().then(setSaveGames);
  }, [])

  return (<>
    <IonHeader>
      <IonTitle>Continue adventure</IonTitle>
    </IonHeader>
    <IonList>
      {saveGames.map(sg =>
        <IonItem key={sg.id} href={`/game/${sg.id}`}>
          <IonLabel>{sg.playerName}</IonLabel>
        </IonItem>
      )}
    </IonList>
  </>)
}