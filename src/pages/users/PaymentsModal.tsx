// A modal to add user

import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface AddUserModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymnets: any[];
  isOpen: boolean;
  onClose: () => void;
}

const PaymnetsModal: React.FC<AddUserModalProps> = ({
  paymnets,
  isOpen,
  onClose,
}) => {
  // const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    // setLoading(true);
    // const users = await loadFromLocalStorage("users");
    // users.push({ name, email });
    // saveToLocalStorage("users", users);
    // setLoading(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-8 w-96 ${
          theme.theme === "dark" ? "text-white" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">{t("Suggested Payments")}</h2>
        {paymnets.map((payment, index) => (
          <div key={index} className="p-4">
            <p>
              <span className="font-bold">{payment.from}</span>
              <ArrowRightIcon className="w-6 h-6 inline-block" />
              <span className="font-bold mr-2">{payment.to}</span>
              {t("Amount")}:
              <span className="font-bold ml-2">
                {payment.amount.toFixed(2)}
              </span>
            </p>
          </div>
        ))}
        <button
          className="p-2 rounded bg-amber-600 text-white font-bold"
          onClick={handleSubmit}
        >
          {t("Cancel")}
        </button>
      </div>
    </div>
  );
};

export default PaymnetsModal;
