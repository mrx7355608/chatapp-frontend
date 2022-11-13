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
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);

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
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Room name</FormLabel>
                            <Input ref={initialRef} placeholder="Room name" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password (optional)</FormLabel>
                            <Input placeholder="Password" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3}>
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
