import { atom, genArray, usePagination } from "@cn-ui/reactive";
import Mock from "mockjs-ts";
import { shuffle } from "radash";
import { Container, Footer, Header, Main } from "../../container";
import { Pagination } from "../../pagination";
import { MagicTable } from "../Table";
import { createColumnHelper } from "../solidTable";
import { newPerson } from "./Expanded";

type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.group({
        id: "hello",
        header: () => <span>Hello</span>,
        // footer: props => props.column.id,
        columns: [
            columnHelper.accessor("firstName", {
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: "lastName",
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id,
            }),
        ],
    }),
    columnHelper.group({
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
            columnHelper.accessor("age", {
                header: () => "Age",
                footer: (props) => props.column.id,
            }),
            columnHelper.group({
                header: "More Info",
                columns: [
                    columnHelper.accessor("visits", {
                        header: () => <span>Visits</span>,
                        footer: (props) => props.column.id,
                    }),
                    columnHelper.accessor("progress", {
                        header: "Profile Progress",
                        footer: (props) => props.column.id,
                    }),
                ],
            }),
        ],
    }),
];

export const PaginationExample = () => {
    const pageSize = atom(100);
    const a = usePagination<Person[]>(
        async (page, max, count) => {
            max(100);
            count(pageSize() * 100);
            return shuffle(
                genArray(100).map((index) => ({
                    ...Mock.mock<Person>(newPerson()),
                    age: 18 + index + 100 * page,
                })),
            );
        },
        { initValue: [] },
    );
    return (
        <Container class="h-full">
            <Header />
            <Main class="overflow-y-scroll mb-4" style={{ padding: 0 }}>
                <MagicTable data={a.currentData()} columns={columns} />
            </Main>
            <Footer>
                <Pagination {...a.toPaginationModel()} pageSize={pageSize()} />
            </Footer>
        </Container>
    );
};
