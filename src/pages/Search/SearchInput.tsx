import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  placeholder: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onInputChange }: SearchInputProps) => {
  return (
    <div className="mb-8 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        value={value}
        onChange={onInputChange}
        placeholder="Search GIFs"
        className="w-full pl-10 pr-4"
      />
    </div>
  );
};

export default SearchInput;
