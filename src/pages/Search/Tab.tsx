import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabProps {
    activeTab: string;
    onTabChange: (value: string) => void;
}

const Tab = ({ activeTab, onTabChange }: TabProps) => {
  return (
    <div className="w-full flex justify-end">
      <Tabs
        defaultValue={activeTab}
        className="mb-4"
        onValueChange={(value: string) => onTabChange(value)}
      >
        <TabsList>
          <TabsTrigger value="gifs">GIFs</TabsTrigger>
          <TabsTrigger value="stickers">Stickers</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Tab;
