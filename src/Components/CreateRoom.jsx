import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel,
    FormControl,
    Input,
} from "@chakra-ui/react";

export default function CreateRoom() {
    const [formdata, setFormData] = React.useState({
        roomName: "",
        roomPassword: "",
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    };

    const handleSubmit = () => {
        console.log(formdata);
    };
    return (
        <>
            <Button
                pt="0.5"
                color="white"
                bgColor="#F3664C"
                mr="8"
                onClick={onOpen}
            >
                Create Room
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Room name</FormLabel>
                            <Input
                                onChange={(e) => handleChange(e)}
                                name="roomName"
                                placeholder="Room name"
                                type="text"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                onChange={(e) => handleChange(e)}
                                name="roomPassword"
                                placeholder="Password"
                                type="password"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="red" mr={3}>
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
