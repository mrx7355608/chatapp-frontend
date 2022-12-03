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
    Text,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";

export default function CreateRoom() {
    const { state } = useAuth();
    const toast = useToast();
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formdata, setFormData] = React.useState({
        roomName: "",
        roomPassword: "",
    });

    // On Change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    };

    // On Submit handler
    const handleSubmit = () => {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_URL}/rooms/create`;
        axios
            .post(url, formdata, {
                headers: { authorization: `Bearer ${state.accessToken}` },
            })
            .then((resp) => {
                setLoading(false);
                toast({
                    title: "Room has been created",
                    description: `RoomID: ${resp.data.data.roomid}`,
                    status: "success",
                    isClosable: true,
                });
            })
            .catch((err) => {
                setLoading(false);
                setTimeout(() => {
                    setError(null);
                }, 3000);
                if (err.response) {
                    return setError(err.response.data.message);
                }
                return setError("Something went wrong!");
            });
    };
    return (
        <>
            <Button pt="0.5" colorScheme="purple" mr="8" onClick={onOpen}>
                Create Room
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            {error && (
                                <Text
                                    p="3"
                                    rounded="md"
                                    color="red.800"
                                    bgColor="red.200"
                                    my="3"
                                >
                                    {error}
                                </Text>
                            )}
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
                        {loading ? (
                            <Button disabled colorScheme="red" mr={3}>
                                <Spinner size="sm" mr="2" />
                                Creating ...
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                colorScheme="orange"
                                mr={3}
                            >
                                Create
                            </Button>
                        )}

                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
