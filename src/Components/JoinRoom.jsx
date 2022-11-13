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

export default function JoinRoom() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);

    return (
        <>
            <Button pt="0.5" color="white" bgColor="#F3664C" onClick={onOpen}>
                Join Room
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Join Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Room ID</FormLabel>
                            <Input ref={initialRef} placeholder="Room ID" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="Password" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3}>
                            Join
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
