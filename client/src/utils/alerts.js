import Swal from "sweetalert2";

export const showSuccessAlert = (title, text) => {
	Swal.fire({
		title: title,
		text: text,
		icon: "success",
	});
};

export const showErrorAlert = (title = "Oops...", text = "Something went wrong!") => {
	Swal.fire({
		icon: "error",
		title: title,
		text: text,
	});
};
