import { Collection } from "collections";
import { uniq } from "lodash";
import { ReactElement, useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { CustomMultipleSelect } from "../custom_input/CustomMultiSelect";

type propsType = {
  show: boolean;
  selectedAnimes: number[];
  handleClose: any;
};

const CollectionFormModal = (props: propsType): ReactElement => {
  const { show, handleClose, selectedAnimes } = props;

  const [collections, setCurrentCollections] = useState([] as Collection[]);

  const [saveToCollectionType, setSaveToCollectionType] = useState("existing");

  const [newCollectionName, setNewCollectionName] = useState("");

  const [selectedCollections, setSelectedCollections] = useState(
    [] as string[]
  );

  const [validityReason, setValidityReason] = useState("");

  const [isValid, setIsValid] = useState(false);

  const Swalert = Swal.mixin({
    didClose: () => {
      handleClose(true);
    },
  });

  useEffect(() => {
    const localCollections = localStorage.getItem("collections");
    if (localCollections && Array.isArray(JSON.parse(localCollections))) {
      const collectionsArray = JSON.parse(localCollections) as Collection[];
      setCurrentCollections(collectionsArray);
    }
  }, []);

  const checkNewCollectionValidity = () => {
    if (
      collections
        .map((collection) => collection.name)
        .includes(newCollectionName)
    ) {
      setIsValid(false);
      setValidityReason("Collection name has already exist");
    } else if (!newCollectionName) {
      setIsValid(false);
      setValidityReason("Collection name cannot be empty");
    } else if (/[^a-zA-Z0-9 ]/g.test(newCollectionName)) {
      setIsValid(false);
      setValidityReason(
        "Collection name must only have alphanumeric characters"
      );
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    checkNewCollectionValidity();
  }, [newCollectionName, collections]);

  const handleInputChange = (event: any) => {
    setNewCollectionName(event.target.value.replace(/\s+/g, " "));
  };

  const handleSelectChange = (value: any) => {
    setSelectedCollections(value);
  };

  const handleSave = () => {
    if (saveToCollectionType === "new" && isValid) {
      const updatedCollections = [
        ...collections,
        {
          name: newCollectionName,
          ids: [...selectedAnimes],
        },
      ];

      setCurrentCollections(updatedCollections);

      localStorage.removeItem("collections");
      localStorage.setItem("collections", JSON.stringify(updatedCollections));

      Swalert.fire({
        icon: "success",
        title: "New Collection Created",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (saveToCollectionType === "existing" && selectedCollections) {
      let updatedCollections = collections.map((collection) => {
        if (selectedCollections.includes(collection.name)) {
          return {
            ...collection,
            ids: uniq([...collection.ids, ...selectedAnimes]),
          };
        }
        return collection;
      });

      setCurrentCollections(updatedCollections);

      localStorage.removeItem("collections");
      localStorage.setItem("collections", JSON.stringify(updatedCollections));

      Swalert.fire({
        icon: "success",
        title: "Selected Animes Successfully Added to Collection",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          // @ts-ignore
          fill
          id="controlled-tab-example"
          activeKey={saveToCollectionType}
          onSelect={(k) => setSaveToCollectionType(k as string)}
          className="mb-3"
        >
          <Tab eventKey="existing" title="Choose Collection" className="w-100">
            <CustomMultipleSelect
              values={collections.map((collection) => ({
                label: collection.name,
                value: collection.name,
              }))}
              placeHolder="Cari"
              onInput={handleSelectChange}
              value={selectedCollections}
              showSearchBar={true}
              showCollectedTags={false}
              collectedTagsContainerHeight={4}
              dropdownMaxHeight={11}
            />
          </Tab>
          <Tab eventKey="new" title="New Collection">
            <div className="mb-3">
              <label htmlFor="collection_name" className="form-label">
                New colection name
              </label>
              <input
                className="form-control"
                id="collection_name"
                type="text"
                value={newCollectionName}
                placeholder="Enter name"
                onChange={handleInputChange}
              />
              {!isValid && <p className="mt-1 text-danger">{validityReason}</p>}
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <button className=" btn btn-secondary" onClick={handleClose}>
          Close
        </button>
        <button
          disabled={saveToCollectionType === "new" && !isValid}
          className=" btn btn-primary"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CollectionFormModal;
