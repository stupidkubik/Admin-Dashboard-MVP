"use client";

import { useRef } from "react";
import { useLocale } from "@/contexts/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useLocale();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      showCloseButton={false}
      closeOnOverlayClick={false}
      initialFocusRef={cancelRef}
      role="alertdialog"
      contentClassName="max-w-sm"
    >
      <div className="flex justify-end gap-2">
        <Button
          ref={cancelRef}
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {t("common.buttons.cancel", "Cancel")}
        </Button>
        <Button type="button" variant="destructive" onClick={onConfirm}>
          {t("common.buttons.confirm", "Confirm")}
        </Button>
      </div>
    </Dialog>
  );
}
