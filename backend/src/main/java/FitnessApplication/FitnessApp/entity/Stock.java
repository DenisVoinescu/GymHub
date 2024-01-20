package FitnessApplication.FitnessApp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@Table
public class Stock {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "item_id", nullable = true)
    private Integer itemId;
    @Basic
    @Column(name = "size_id", nullable = true)
    private Integer sizeId;
    @Basic
    @Column(name = "quantity", nullable = true)
    private Integer quantity;

}
