import { IonHeader, IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle } from '@ionic/react';
import React, { useState } from 'react';

export const CharacterEditor = () => {
  const [name, setName] = useState<string>();

  return (<>
    <IonHeader>
      <IonTitle>Create new hero</IonTitle>
    </IonHeader>
    <IonList>
      <IonItem>
        <IonInput value={name} placeholder="Player Name" onIonChange={e => setName(e.detail.value!)}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Character class</IonLabel>
        <IonSelect>
          <IonSelectOption value="carpenter">Carpenter</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  </>)
}