import Image from "next/image";
import { FC } from "react";

type ActionType = "delete" | "edit" | (string & {});

interface Props {
  columns: Array<{ label: string; value: string }>;
  data: Array<any>;
  actions?: ActionType[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const ACTIONS = {
  delte: "delete",
  edit: "edit",
};

export const DataTable: FC<Props> = ({
  columns,
  data,
  actions,
  onDelete,
  onEdit,
}) => {
  const renderAction = (action: string, id: string) => {
    switch (action) {
      case ACTIONS.delte:
        return (
          <Image
            onClick={() => onDelete && onDelete(id)}
            src="/static/icons/delete.svg"
            alt="delte"
            width={20}
            height={20}
          />
        );
      case ACTIONS.edit:
        return (
          <Image
            onClick={() => onEdit && onEdit(id)}
            src="/static/icons/edit.svg"
            alt="delte"
            width={20}
            height={20}
          />
        );

      default:
        break;
    }
  };
  return (
    <div className="overflow-auto">
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.value} scope="col" className="text-nowrap">
                {column.label}
              </th>
            ))}
            {actions && actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        {data && data.length !== 0 && (
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.value} className="text-nowrap">
                    {column.label === "#" ? index + 1 : item[column.value]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="d-flex gap-2">
                    {actions.map((action, index) => (
                      <div key={index} role="button">
                        {renderAction(action as unknown as string, item.id)}
                      </div>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
