import { useActiveAccount, useReadContract } from "thirdweb/react";
import { roleMangerContract } from "@/config/thirdweb.config";
import { keccak256, toHex } from "thirdweb";
import { useState, useEffect } from "react";

const useRole = () => {
  const [role, setRole] = useState("");
  const activeAccount = useActiveAccount();

  const { data: hasAnyRole, isLoading: isHasAnyRoleLoading } = useReadContract({
    contract: roleMangerContract,
    method: "function hasAnyRole(address) view returns (bool)",
    params: [
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
    queryOptions: { enabled: !!activeAccount?.address },
  });

  const { data: isAdmin, isLoading: isAdminLoading } = useReadContract({
    contract: roleMangerContract,
    method:
      "function hasRole(bytes32 role, address account) view returns (bool)",
    params: [
      keccak256(toHex("ADMIN_ROLE")),
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
    queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  });

  const { data: isManufacturer, isLoading: isManufacturerLoading } =
    useReadContract({
      contract: roleMangerContract,
      method:
        "function hasRole(bytes32 role, address account) view returns (bool)",
      params: [
        keccak256(toHex("MANUFACTURER_ROLE")),
        activeAccount?.address || "0x0000000000000000000000000000000000000000",
      ],
      queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
    });

  const { data: isRecycler, isLoading: isRecyclerLoading } = useReadContract({
    contract: roleMangerContract,
    method:
      "function hasRole(bytes32 role, address account) view returns (bool)",
    params: [
      keccak256(toHex("RECYCLER_ROLE")),
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
    queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  });

  const { data: isRagPicker, isLoading: isRagPickerLoading } = useReadContract({
    contract: roleMangerContract,
    method:
      "function hasRole(bytes32 role, address account) view returns (bool)",
    params: [
      keccak256(toHex("RAGPICKER_ROLE")),
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
    queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  });

  const { data: isCitizen, isLoading: isCitizenLoading } = useReadContract({
    contract: roleMangerContract,
    method:
      "function hasRole(bytes32 role, address account) view returns (bool)",
    params: [
      keccak256(toHex("CITIZEN_ROLE")),
      activeAccount?.address || "0x0000000000000000000000000000000000000000",
    ],
    queryOptions: { enabled: !!activeAccount?.address && hasAnyRole },
  });

  useEffect(() => {
    if (isAdmin) {
      setRole("admin");
    } else if (isManufacturer) {
      setRole("manufacturer");
    } else if (isRecycler) {
      setRole("recycler");
    } else if (isRagPicker) {
      setRole("ragpicker");
    } else if (isCitizen) {
      setRole("citizen");
    } else {
      setRole("");
    }
  }, [isAdmin, isManufacturer, isRecycler, isRagPicker, isCitizen]);

  return {
    role,
    isLoading:
      isHasAnyRoleLoading ||
      isAdminLoading ||
      isManufacturerLoading ||
      isRecyclerLoading ||
      isRagPickerLoading ||
      isCitizenLoading,
  };
};

export default useRole;
