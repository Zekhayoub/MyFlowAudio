import Header from "@/components/features/Header";
import AccountContent from "./component/EditContent";
import getUserSettings from "@/actions/getUserSettings";

const Account = async () => {
    const AccountSettings = await getUserSettings();
    return (
        <div
            className="
                bg-background
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mb-2 flex flex-col gap-y-6 items-center">
                    <h1 className="text-primary text-3xl font-semibold mb-8">
                        Account Edit
                    </h1>
                </div>
            </Header>
            <div className="mb-7 px-6">
                {AccountSettings.map((data) => (
                    <AccountContent data={data} />
                ))}
            </div>

        </div>
    );
}

export default Account;