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
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
    const navigateTo = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [roomid, setRoomId] = React.useState(null);

    const handleJoinRoom = () => {
        if (!roomid) return null;
        return navigateTo(`/room/${roomid}`);
    };

    return (
        <>
            <Button pt="0.5" colorScheme="purple" onClick={onOpen}>
                Join Room
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Join Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Room ID</FormLabel>
                            <Input
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="Room ID"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleJoinRoom}
                            colorScheme="orange"
                            mr={3}
                        >
                            Join
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
