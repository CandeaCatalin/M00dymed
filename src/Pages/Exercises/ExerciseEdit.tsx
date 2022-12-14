import { Box, InputLabel, MenuItem, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    DiagnosticInput,
    ModalTitle,
    NameInput,
    SubmitButton,
} from '../../components/common/CredentialsForm.components';
import { AddBtn, FilterForm, FooterContainer } from '../../components/common/Doctors.components.tsx';
import { Appwrite } from '../../services/Appwrite';
import { AppWriteExercises } from '../../services/AppwriteExercises';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: `white`,
    borderRadius: '50px',
    boxShadow: 24,
    p: 4,
};

interface ExerciseValues {
    titleInput: string;
    descriptionInput: string;
    mediaInput: string;
    diagnosticInput: string;
}

export const AddExercise = ({ refresh }) => {
    const { getDiagnosis } = Appwrite();
    const [diagnostics, setDiagnostics] = useState([]);
    useEffect(() => {
        getDiagnosis().then((d) => {
            setDiagnostics(d.documents);
        });
    }, []);
    const [values, setValues] = useState<ExerciseValues>({
        titleInput: '',
        descriptionInput: '',
        mediaInput: '',
        diagnosticInput: '',
    });
    const { addExercise } = AppWriteExercises();
    const save = async () => {
        await addExercise(values.titleInput, values.descriptionInput, values.mediaInput, values.diagnosticInput);
        refresh();
        handleClose();
    };
    const handleChange = (prop: keyof ExerciseValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const Insert = async () => {
        await save();
    };
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    return (
        <div>
            <AddBtn variant="contained" sx={{ 'margin-top': '0px !important' }} onClick={handleOpen}>
                Add
            </AddBtn>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalTitle>Add Exercise</ModalTitle>
                    <NameInput
                        id="outlined-required"
                        label="Title"
                        variant="outlined"
                        onChange={handleChange('titleInput')}
                    />
                    <NameInput
                        id="outlined-required"
                        label="Media URL"
                        variant="outlined"
                        onChange={handleChange('mediaInput')}
                    />
                    <FilterForm>
                        <InputLabel>Diagnostic</InputLabel>
                        <DiagnosticInput
                            labelId="diagnostics"
                            id="diagnostics"
                            label="Diagnostics"
                            style={{ width: '100%' }}
                            onChange={handleChange('diagnosticInput')}
                        >
                            {diagnostics.map((diagnostic) => {
                                return <MenuItem value={diagnostic.Name}>{diagnostic.Name}</MenuItem>;
                            })}
                        </DiagnosticInput>
                    </FilterForm>
                    <NameInput
                        id="outlined-required"
                        label="Description"
                        variant="outlined"
                        multiline
                        maxRows={10}
                        minRows={3}
                        onChange={handleChange('descriptionInput')}
                    />
                    <FooterContainer>
                        <SubmitButton onClick={Insert}>Save</SubmitButton>
                        <SubmitButton onClick={handleClose}>Cancel</SubmitButton>
                    </FooterContainer>
                </Box>
            </Modal>
        </div>
    );
};

export const EditExercise = (props: any) => {
    const { getDiagnosis } = Appwrite();
    const [diagnostics, setDiagnostics] = useState([]);
    useEffect(() => {
        getDiagnosis().then((d) => {
            setDiagnostics(d.documents);
        });
    }, []);
    const row = props.row;
    const [values, setValues] = useState<ExerciseValues>({
        titleInput: row.Title,
        descriptionInput: row.Description,
        mediaInput: row.Media,
        diagnosticInput: row.Content,
    });
    const handleChange = (prop: keyof ExerciseValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const Insert = async () => {
        console.log(values, row.id);
    };
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    return (
        <div>
            <MenuItem onClick={handleOpen}>Edit</MenuItem>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalTitle>Add Exercise</ModalTitle>
                    <NameInput
                        id="outlined-required"
                        label="Title"
                        variant="outlined"
                        value={row.Title}
                        onChange={handleChange('titleInput')}
                    />
                    <NameInput
                        id="outlined-required"
                        label="Media URL"
                        variant="outlined"
                        value={row.Media}
                        onChange={handleChange('mediaInput')}
                    />
                    <FilterForm>
                        <InputLabel>Diagnostic</InputLabel>
                        <DiagnosticInput
                            labelId="diagnostics"
                            id="diagnostics"
                            value={row.Diagnostic}
                            label="Diagnostics"
                            style={{ width: '100%' }}
                            onChange={handleChange('diagnosticInput')}
                        >
                            {diagnostics.map((diagnostic) => {
                                return <MenuItem value={diagnostic.Name}>{diagnostic.Name}</MenuItem>;
                            })}
                        </DiagnosticInput>
                    </FilterForm>
                    <NameInput
                        id="outlined-required"
                        label="Description"
                        variant="outlined"
                        value={row.Content}
                        multiline
                        maxRows={10}
                        minRows={3}
                        onChange={handleChange('descriptionInput')}
                    />
                    <FooterContainer>
                        <SubmitButton onClick={Insert}>Save</SubmitButton>
                        <SubmitButton onClick={handleClose}>Cancel</SubmitButton>
                    </FooterContainer>
                </Box>
            </Modal>
        </div>
    );
};

export const DeleteExercise = (props: any) => {
    const row = props.row;
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const Delete = async () => {
        console.log(row.id);
    };
    return (
        <div>
            <MenuItem onClick={handleOpen}>Delete</MenuItem>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalTitle>Are you sure?</ModalTitle>

                    <FooterContainer>
                        <SubmitButton sx={{ 'margin-right': '10vh !important' }} onClick={Delete}>
                            Delte
                        </SubmitButton>
                        <SubmitButton sx={{ 'margin-left': '10vh !important' }} onClick={handleClose}>
                            Cancel
                        </SubmitButton>
                    </FooterContainer>
                </Box>
            </Modal>
        </div>
    );
};
