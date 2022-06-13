import { Fragment, useEffect, useState } from 'react';
import { Animal } from '../util/database';

export default function ApiFrontendAnimalList() {
  const [animalList, setAnimalList] = useState<Animal[]>([]);

  const [activeAnimalId, setActiveAnimalId] = useState<
    Animal['id'] | undefined
  >(undefined);

  // state for new animal inputs
  const [newFirstName, setNewFirstName] = useState('');
  const [newAccessory, setNewAccessory] = useState('');
  const [newType, setNewType] = useState('');

  // state for edit animal inputs
  const [editFirstName, setEditFirstName] = useState('');
  const [editAccessory, setEditAccessory] = useState('');

  useEffect(() => {
    async function getAnimals() {
      const response = await fetch('/api/animals');
      const animals = await response.json();
      setAnimalList(animals);
    }
    getAnimals().catch(() => {
      console.log('animal request fails');
    });
  }, []);

  async function createAnimalHandler() {
    const response = await fetch('api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newFirstName,
        accessory: newAccessory,
        type: newType,
      }),
    });
    const createdAnimal = await response.json();

    // copy state
    // update copy of the state
    const newState = [...animalList, createdAnimal];
    // use setState func
    setAnimalList(newState);
    setNewFirstName('');
    setNewAccessory('');
    setNewType('');
  }

  async function deleteAnimalHandler(id: number) {
    const response = await fetch(`api/animals/${id}`, { method: 'DELETE' });
    const deletedAnimal = await response.json();

    // copy state
    // update copy of the state
    const newState = animalList.filter(
      (animal) => animal.id !== deletedAnimal.id,
    );
    // use setState func
    setAnimalList(newState);
  }

  async function updateAnimalHandler(id: number) {
    const response = await fetch(`api/animals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: editFirstName,
        accessory: editAccessory,
      }),
    });
    const updatedAnimal = await response.json();

    // copy state
    // update copy of the state
    const newState = animalList.map((animal) => {
      if (animal.id === updatedAnimal.id) {
        return updatedAnimal;
      } else {
        return animal;
      }
    });
    // use setState func
    setAnimalList(newState);
  }

  return (
    <>
      <label>
        Name:{' '}
        <input
          value={newFirstName}
          onChange={(event) => setNewFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Accessory:{' '}
        <input
          value={newAccessory}
          onChange={(event) => setNewAccessory(event.currentTarget.value)}
        />
      </label>
      <label>
        Type:{' '}
        <input
          value={newType}
          onChange={(event) => setNewType(event.currentTarget.value)}
        />
      </label>
      <button
        onClick={() => {
          createAnimalHandler().catch(() => {
            console.log('animal request fails');
          });
        }}
      >
        add animal
      </button>
      <hr />
      animal to be created: {newFirstName} {newAccessory} {newType}
      <hr />
      {animalList
        .sort((a, b) => a.id - b.id)
        .map((animal) => {
          return animal.id === activeAnimalId ? (
            <Fragment key={animal.id}>
              <label>
                Name:{' '}
                <input
                  value={editFirstName}
                  onChange={(event) =>
                    setEditFirstName(event.currentTarget.value)
                  }
                />
              </label>
              <label>
                Accessory:{' '}
                <input
                  value={editAccessory}
                  onChange={(event) =>
                    setEditAccessory(event.currentTarget.value)
                  }
                />
              </label>
              Type: {animal.type}
              <button
                onClick={() => {
                  setActiveAnimalId(undefined);
                  updateAnimalHandler(animal.id).catch(() => {
                    console.log('animal request fails');
                  });
                }}
              >
                save
              </button>
              <button
                onClick={() =>
                  deleteAnimalHandler(animal.id).catch(() => {
                    console.log('animal request fails');
                  })
                }
              >
                X
              </button>
              <br />
            </Fragment>
          ) : (
            <Fragment key={animal.id}>
              <label>
                Name: <input value={animal.firstName} disabled />
              </label>
              <label>
                Accessory: <input value={animal.accessory} disabled />
              </label>
              Type: {animal.type}
              <button
                onClick={() => {
                  setActiveAnimalId(animal.id);
                  setEditFirstName(animal.firstName);
                  setEditAccessory(animal.accessory);
                }}
              >
                edit
              </button>
              <button
                onClick={() =>
                  deleteAnimalHandler(animal.id).catch(() => {
                    console.log('animal request fails');
                  })
                }
              >
                X
              </button>
              <br />
            </Fragment>
          );
        })}
    </>
  );
}
