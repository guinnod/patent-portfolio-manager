
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Eye, MoreHorizontal, FileEdit, Trash2, FileUp } from "lucide-react";
import { Patent } from "@/types";

interface PatentTableProps {
  patents: Patent[];
}

export function PatentTable({ patents }: PatentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patents.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (id: string) => {
    navigate(`/patents/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/patents/${id}/edit`);
  };

  const handleDelete = (id: string, name: string) => {
    // In a real app, this would call an API
    toast({
      title: "Удаление объекта",
      description: `Объект "${name}" был удален.`,
    });
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-16">№</TableHead>
              <TableHead>Название Объекта</TableHead>
              <TableHead>Дата Регистрации</TableHead>
              <TableHead>Уникальный идентификатор (UID)</TableHead>
              <TableHead className="w-16 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((patent, index) => (
              <TableRow 
                key={patent.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell className="font-medium">{patent.name}</TableCell>
                <TableCell>{patent.registrationDate}</TableCell>
                <TableCell className="font-mono text-sm">{patent.uid}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Действия</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => handleView(patent.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Просмотр</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(patent.id)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        <span>Редактировать</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileUp className="mr-2 h-4 w-4" />
                        <span>Загрузить</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500 focus:text-red-500"
                        onClick={() => handleDelete(patent.id, patent.name)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Удалить</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? "bg-brand-DEFAULT text-white" : "cursor-pointer"}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
