import { useBookRoomMutation } from "../../generated";

export type SelectRoomsProps = {
    rooms: any;
};
export const SelectRooms: React.FC<SelectRoomsProps> = ({ rooms }) => {
    const [book] = useBookRoomMutation();

    if (!rooms.length) {
        return null;
    }

    return (
        <div style={{ marginTop: 32 }}>
            <div>Current selection: </div>
            <button
                onClick={async () => {
                    rooms.forEach(async (room: any) => {
                        await book({
                            variables: {
                                _id: room._id,
                            },
                        });
                    });
                }}
                style={{ padding: "4px 32px" }}
            >
                Book
            </button>
        </div>
    );
};
