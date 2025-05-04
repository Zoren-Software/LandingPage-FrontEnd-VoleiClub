import Swal from "sweetalert2";

function confirmAction(options, onConfirm, onCancel) {
  const confirmActionOptions = options.confirmAction;
  delete options.confirmAction;

  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      if (confirmActionOptions) {
        Swal.fire(confirmActionOptions);
      }
      if (onConfirm) onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
      onCancel();
    }
  });
}

export function confirmDeleteSingle(onDelete, onCancel) {
  confirmAction(
    {
      title: "Deseja deletar este registro?",
      text: "Você não será capaz de reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      confirmButtonColor: "#154EC1",
      cancelButtonColor: "#E42222",
      cancelButtonText: "Não, cancelar!",
      confirmAction: {
        title: "Deletando!",
        text: "Seu registro está sendo deletado!",
        timer: 1000,
        icon: "info",
        showConfirmButton: false,
      },
    },
    onDelete,
    onCancel
  );
}

export function confirmDeleteMultiple(totalItems, onDelete, onCancel) {
  confirmAction(
    {
      title: "Deseja deletar estes registros?",
      text: "Você não será capaz de reverter isso!",
      icon: "warning",
      html: `Você tem <b>${totalItems}</b> registros selecionados para deletar.<br>`,
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      confirmButtonColor: "#154EC1",
      cancelButtonColor: "#E42222",
      cancelButtonText: "Não, cancelar!",
      confirmAction: {
        title: "Deletando!",
        text: "Seus registros estão sendo deletados!",
        timer: 1000,
        icon: "info",
        showConfirmButton: false,
      },
    },
    onDelete,
    onCancel
  );
}

export function confirmSuccess(text, onConfirm) {
  confirmAction(
    {
      icon: "success",
      title: "Sucesso!",
      text,
      showConfirmButton: true,
      confirmButtonColor: "#154EC1",
    },
    onConfirm
  );
}

export function confirmError(text, onConfirm) {
  confirmAction(
    {
      icon: "error",
      title: "Erro!",
      text,
      showConfirmButton: true,
      confirmButtonColor: "#154EC1",
    },
    onConfirm
  );
}

export function loader(loading) {
  Swal.fire({
    title: "Carregando!",
    text: "Aguarde um momento...",
    icon: "info",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
      let timer = Swal.getPopup().querySelector("b");
      setInterval(() => {
        timer = `${Swal.getTimerLeft()}`;
      }, 100);
    },
  });
}

export function confirmUnsubscribe(onConfirm, onCancel) {
  Swal.fire({
    title: "Cancelar Inscrição",
    text: "Por favor, digite seu e-mail para cancelar sua inscrição e não receber mais nossos e-mails.",
    input: "email",
    inputPlaceholder: "Digite seu e-mail",
    showCancelButton: true,
    confirmButtonText: "Confirmar cancelamento",
    cancelButtonText: "Voltar",
    confirmButtonColor: "#154EC1",
    cancelButtonColor: "#E42222",
    reverseButtons: true,
    inputValidator: (value) => {
      if (!value) {
        return "O e-mail é obrigatório!";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Digite um e-mail válido!";
      }
      return undefined;
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm) onConfirm(result.value);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      if (onCancel) onCancel();
    }
  });
}
